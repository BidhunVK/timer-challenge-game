import {useRef,  forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({
  result,
  targetTime,
  timeRemaining,
  onReset
}, ref) {
    
    const dialog = useRef();

    const userLost = timeRemaining <= 0;

    const formattedRemainingTime = (timeRemaining /1000).toFixed(2);

    const score = Math.round((1 -( timeRemaining / (targetTime*1000)) )*100);

    useImperativeHandle(ref, () => {
        return{
            open(){
                dialog.current.showModal();
            }
        }
    })

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
     {userLost && <h2>You Lost</h2>}
     {!userLost && <h2>Your score : {score}</h2> }
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong> {formattedRemainingTime} seconds left.</strong>
      </p>
      <form action="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
    
  );
});

export default ResultModal;
