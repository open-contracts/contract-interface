import React, { ErrorInfo } from "react";
import {ErrorDispatch, useErrorContext} from "../ErrorProvider";

type UniversalErrorBoundaryProps = {

}

type UniversalErrorBoundaryStateI = {
    error : Error | undefined
}

export class UniversalErrorBoundary extends React.Component<UniversalErrorBoundaryProps, UniversalErrorBoundaryStateI> {
    state : UniversalErrorBoundaryStateI = {
        error : undefined
    }

    constructor(props : UniversalErrorBoundaryProps) {
      super(props);
      this.state = { error: undefined };
    }
  
    static getDerivedStateFromError(error : Error) {
      // Update state so the next render will show the fallback UI.
      console.log(error);
      return { error: error };
    }
  
    render() {

      console.log(this.state.error);

      if (this.state.error) {

        return <ErrorDispatch error={this.state.error}/>;
      }
  
      return this.props.children; 
    }
  }