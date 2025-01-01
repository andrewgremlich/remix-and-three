import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

import { base64UrlEncode } from "./base64";
import {
	googleStun,
	pushData,
	useFirebaseConnection,
	useReadFirebaseData,
} from "./firebase";
import { onValue, ref } from "firebase/database";

export const useOfferWebRTC = (urlstring: string) => {
	const peerConnection = useRef<RTCPeerConnection | null>(null);
	const { database } = useFirebaseConnection();
	const iceCandidates = useReadFirebaseData<RTCIceCandidate[] | null>(
		database,
		"iceCandidates",
	);
	const [qrCode, setQrCode] = useState<string | null>(null);
	const [offerKey, setOfferKey] = useState<string | undefined | null>(
		undefined,
	);

	useEffect(() => {
		const setupConnection = async () => {
			try {
				const pc = new RTCPeerConnection(googleStun);

				peerConnection.current = pc;

				const dataChannel =
					peerConnection.current.createDataChannel("datachannel");

				dataChannel.onopen = () => {
					console.log("Data Channel Opened");
				};

				dataChannel.onmessage = (event) => {
					console.log("Data Channel Message:", event.data);
				};

				dataChannel.onclose = () => {
					console.log("Data Channel Closed");
				};

				dataChannel.onerror = (error) => {
					console.error("Data Channel Error:", error);
				};

				peerConnection.current.addEventListener("icecandidate", (event) => {
					console.log("ICE Candidate event:", event);
					if (event.candidate) {
						pushData(database, "iceCandidates", event.candidate.toJSON());
					}
				});

				const offer = await peerConnection.current.createOffer({
					iceRestart: true,
					// offerToReceiveVideo: true,
					// offerToReceiveAudio: true,
				});
				await peerConnection.current.setLocalDescription(offer);

				const offerData = await pushData(database, "sessions", offer);

				setOfferKey(offerData?.key);

				const offerString = base64UrlEncode(
					JSON.stringify({ key: offerData?.key }),
				);
				const qrCodeUrl = `${urlstring}/controller?offerId=${offerString}`;
				console.log("QR Code URL:", qrCodeUrl);
				const qrCodeData = await QRCode.toDataURL(qrCodeUrl);

				setQrCode(qrCodeData);
			} catch (error) {
				console.error(error);
			}
		};

		if (database) {
			setupConnection();
		}

		return () => {
			if (peerConnection.current) {
				peerConnection.current.close();
				// TODO: DON"T DELETE THE OFFER HERE
				// setData(database, `sessions/${offerKey}`, null);
			}
		};
	}, [database, urlstring]);

	useEffect(() => {
		const setAnswerData = async (answerData: RTCSessionDescriptionInit) => {
			console.log(answerData);
			try {
				if (peerConnection.current?.remoteDescription) {
					console.log("ANSWER", answerData);
					await peerConnection.current.setRemoteDescription(
						new RTCSessionDescription(answerData),
					);
				}
			} catch (error) {
				console.error(error);
			}
		};

		if (database) {
			console.log(offerKey);
			onValue(ref(database, `sessions/${offerKey}/answers`), (snapshot) => {
				const val = snapshot.val();

				if (val) {
					const answers: RTCSessionDescriptionInit[] = Object.values(val);
					if (answers.length > 0) {
						for (const answer of answers) {
							setAnswerData(answer);
						}
					}
				}
			});
		}
	}, [database, offerKey]);

	useEffect(() => {
		const addCandidate = async (candidate: RTCIceCandidate) => {
			if (peerConnection.current?.remoteDescription) {
				try {
					await peerConnection.current?.addIceCandidate(
						new RTCIceCandidate(candidate),
					);
				} catch (err) {
					console.error("Error adding ICE candidate:", err);
				}
			}
		};

		console.log({ iceCandidates });

		if (iceCandidates && peerConnection && database) {
			for (const candidate of Object.values(iceCandidates)) {
				addCandidate(candidate);
			}
		}
	}, [iceCandidates, database]);

	return { qrCode };
};
