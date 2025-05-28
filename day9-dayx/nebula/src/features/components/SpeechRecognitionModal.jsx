import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";

function SpeechRecognitionModal() {
  return (
    <dialog id={APP_CONSTANTS.SPEECH_RECOGNITION_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Dictate</h3>
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
