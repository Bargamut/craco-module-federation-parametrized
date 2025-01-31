import React from "react";
import styled from "styled-components";
import "./App.css";

//@ts-expect-error
import Button from "app2/Button";

// NOTE: Webpack recommends React.lazy usage
//@ ts-expect-error
// const Button = React.lazy(() => import("app2/Button"));

function App() {
  return (
    <div className="App">
      This is app1

      <React.Suspense fallback="loading">
        <Button />

        <StyledButton />
      </React.Suspense>
    </div>
  );
}

const StyledButton = styled(Button)`
  color: blue;
`;

export default App;
