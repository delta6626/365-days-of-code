import { LoaderIcon, Mic } from "lucide-react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";

function SpeechRecognitionModal() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({});

  return (
    <dialog id={APP_CONSTANTS.SPEECH_RECOGNITION_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Dictation</h3>
        {browserSupportsSpeechRecognition ? (
          <div className="w-full flex flex-col items-center justify-center">
            <button className="my-8" onClick={SpeechRecognition.startListening}>
              <div className="relative h-[50px] flex items-center justify-center">
                <LoaderIcon
                  className={listening ? "absolute animate-ping" : "hidden"}
                  size={50}
                  strokeWidth={1}
                />
                <Mic size={30} className="z-10" />
              </div>
            </button>

            <p className="max-h-[300px] overflow-y-auto"></p>
          </div>
        ) : (
          <p className="mt-2">
            Sorry, your browser doesn't support speech recognition.
          </p>
        )}
        <div className="modal-action">
          <button className="btn btn-primary">{APP_CONSTANTS.INSERT}</button>
          <button
            className="btn"
            onClick={() => {
              document
                .getElementById(APP_CONSTANTS.SPEECH_RECOGNITION_MODAL)
                .close();
            }}
          >
            {APP_CONSTANTS.CANCEL}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default SpeechRecognitionModal;
