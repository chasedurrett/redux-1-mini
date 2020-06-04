import React, { Component } from "react";
import store from "./store";
import { actions } from "./store";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: store.getState(),
    };
  }

  undo(){
    store.dispatch({
      type: actions.UNDO
    })
  }
  redo(){
    store.dispatch({
      type: actions.REDO
    })
  }

  increment(amount) {
    store.dispatch({
      amount,
      type: actions.INCREMENT,
    });
  }
  decrement(amount) {
    store.dispatch({
      amount,
      type: actions.DECREMENT,
    });
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        store: store.getState()
      })
    });
  }

  render() {
    const { currentValue, previousValues, futureValues } = this.state.store;
    return (
      <div className="app">
        <section className="counter">
          <h1 className="counter__current-value">{currentValue}</h1>
          <div className="counter__button-wrapper">
            <button
              className="counter__button increment-one"
              onClick={() => this.increment(1)}
            >
              +1
            </button>
            <button
              className="counter__button increment-five"
              onClick={() => this.increment(5)}
            >
              +5
            </button>
            <button
              className="counter__button decrement-one"
              onClick={() => this.decrement(1)}
            >
              -1
            </button>
            <button
              className="counter__button decrement-five"
              onClick={() => this.decrement(5)}
            >
              -5
            </button>
            <br />
            <button
              className="counter__button undo"
              disabled={previousValues.length === 0}
              onClick={() => this.undo()}
            >
              Undo
            </button>
            <button
              className="counter__button redo"
              disabled={futureValues.length === 0}
              onClick={() => this.redo()}
            >
              Redo
            </button>
          </div>
        </section>
        <section className="state">
          <pre>{JSON.stringify(this.state.store, null, 2)}</pre>
        </section>
      </div>
    );
  }
}

export default Counter;
