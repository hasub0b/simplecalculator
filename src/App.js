import "./styles.css"
import NumberBtn from "./NumberBtn";
import OperationBtn from "./OperatinoBtn";
import { useReducer } from "react";

export const ACTIONS = {
  ADD: "add",
  DELETE: "delete",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  EVALUATE: "EVALUATE",
}

function App() {

  const [{currentOperand, previousOperand,operation}, dispatch] = useReducer(reducer, {})

  return (
  <div className="calculator-grid">
  <div className="output">
  <div className="previous-operand">{previousOperand} {operation}</div>
    <div className="current-operand">{currentOperand}</div>
  </div>
  <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>C</button>
  <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
  <OperationBtn operation="-" dispatch={dispatch} />
  <NumberBtn digit="1" dispatch={dispatch} />
  <NumberBtn digit="2" dispatch={dispatch} />
  <NumberBtn digit="3" dispatch={dispatch} />
  <OperationBtn operation="*" dispatch={dispatch} />
  <NumberBtn digit="4" dispatch={dispatch} />
  <NumberBtn digit="5" dispatch={dispatch} />
  <NumberBtn digit="6" dispatch={dispatch} />
  <OperationBtn operation="+" dispatch={dispatch} />
  <NumberBtn digit="7" dispatch={dispatch} />
  <NumberBtn digit="8" dispatch={dispatch} />
  <NumberBtn digit="9" dispatch={dispatch} />
  <OperationBtn operation="-" dispatch={dispatch} />
  <NumberBtn digit="." dispatch={dispatch} />
  <NumberBtn digit="0" dispatch={dispatch} />
  <button className="span-two" id="eaquals" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
</div>
  );
}

function reducer(state, {type, payload}){

  switch (type) {
    case ACTIONS.ADD:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
    }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }

  return computation.toString()
}

export default App;
