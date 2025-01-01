import { useRef, useState, useEffect } from "react";

import {
	getData,
	googleStun,
	pushData,
	useFirebaseConnection,
	useReadFirebaseData,
} from "./firebase";

export const useRTCConnection = (offer: { key: string } | undefined) => {
	const { database } = useFirebaseConnection();
	const peerConnection = useRef<RTCPeerConnection | null>(null);
	const [connected, setConnected] = useState(false);
	const [offerDetails, setOfferDetails] =
		useState<RTCSessionDescriptionInit | null>(null);
	const iceCandidates = useReadFirebaseData<RTCIceCandidate[] | null>(
		database,
		`sessions/${offer?.key}/iceCandidates`,
	);

	useEffect(() => {
		if (offer?.key) {
			getData(
				database,
				`sessions/${offer.key}`,
				(offerDetails: RTCSessionDescriptionInit) => {
					setOfferDetails(offerDetails);
				},
			);
		}
	}, [offer?.key, database]);

	useEffect(() => {
		let pc: RTCPeerConnection;

		const setConnection = async () => {
			try {
				if (offer && offerDetails) {
					pc = new RTCPeerConnection(googleStun);

					peerConnection.current = pc;

					const dataChannel =
						peerConnection.current.createDataChannel("dataChannel");

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
						if (event.candidate) {
							pushData(
								database,
								`sessions/${offer.key}/iceCandidates`,
								event.candidate.toJSON(),
							);
						}
					});

					peerConnection.current.addEventListener(
						"connectionstatechange",
						() => {
							console.log(
								"Connection state:",
								peerConnection.current?.connectionState,
							);
							if (peerConnection.current?.connectionState === "connected") {
								setConnected(true);
								console.log("Connected to host!");
								dataChannel.send("Connected to host!");
							}
						},
					);

					await peerConnection.current.setRemoteDescription(
						new RTCSessionDescription(offerDetails),
					);

					const answer = await peerConnection.current.createAnswer();

					console.log("Answer:", answer);

					await peerConnection.current.setLocalDescription(answer);

					pushData(database, `sessions/${offer.key}/answers`, answer);
				}
			} catch (err) {
				console.error(err);
			}
		};

		if (offer && database) {
			setConnection();
		}

		return () => {
			// Cleanup the connection
			if (peerConnection.current) {
				peerConnection.current?.close();
			}
		};
	}, [offer, database, offerDetails]);

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

		if (iceCandidates && peerConnection && database) {
			for (const candidate of Object.values(iceCandidates)) {
				addCandidate(candidate);
			}
		}
	}, [iceCandidates, database]);

	return { peerConnection, connected };
};
