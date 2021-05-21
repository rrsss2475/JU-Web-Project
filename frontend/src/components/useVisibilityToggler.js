import React, { useState } from "react";

const useVisibilityToggler = (component, visibilty = false) => {
  const [visible, setVisiblity] = useState(() => visibilty);
  return [visible ? component : null, () => setVisiblity((v) => !v)];
};

export default useVisibilityToggler;
