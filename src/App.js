import "./styles.css"
import { useReducer } from "react";

const ACTIONS = {
  ADD: "add",
  DELETE: "delete",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  EAQUALS: "eaquals",
}

function App() {

  const [{current, previous,operation}, dispatch] = useReducer(reducer, {})

  return (
  <div className="calculator-grid">
  <div className="output">
  <div className="previous-operand">{previous} {operation}</div>
    <div className="current-operand">{current}</div>
  </div>
  <button className="span-two">C</button>
  <button>DEL</button>
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>*</button>
  <button>4</button>
  <button>5</button>
  <button>6</button>
  <button>+</button>
  <button>7</button>
  <button>8</button>
  <button>9</button>
  <button>-</button>
  <button>.</button>
  <button>0</button>
  <button className="span-two">=</button>
</div>
  );
}

function reducer(state, {type, parameter}){

  switch (type) {
    case ACTIONS.ADD:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
    }
}

export default App;
