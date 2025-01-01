export type Player = {
  color: string;
  position: [number, number, number];
};

export type GameLoaderData = {
  url: string;
  sessionId?: string;
};

export type RTCOfferConnection = { type: string; sdp: string };
