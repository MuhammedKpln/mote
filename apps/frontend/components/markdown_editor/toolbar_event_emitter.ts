import { TypedEventEmitter } from "@/lib/typed_event_emitter";
import { PreviewType } from "@uiw/react-md-editor";

type Events = {
  previewChange: [prevMode: PreviewType, newMode: PreviewType];
};

class MoteToolbarEventEmitter extends TypedEventEmitter<Events> {}

export const moteToolbarEventEmitter = new MoteToolbarEventEmitter();
