import { useEffect, useState } from "react";

export const atom = <InitialType>(initialValue: InitialType) => ({
  init: initialValue,
});

const atomStateMap = new WeakMap();

const getAtomState = (atom: { init: any }) => {
  if (!atomStateMap.has(atom)) {
    atomStateMap.set(atom, {
      value: atom.init,
      subscribers: new Set(),
    });
  }
  return atomStateMap.get(atom);
};

export const useAtom = <AtomType>(atom: AtomType) => {
  const atomState = getAtomState(atom as { init: any });
  const [value, setValue] = useState(atomState.value);
  useEffect(() => {
    const callback = () => setValue(atomState.value);
    atomState.subscribers.add(callback);
    return () => {
      atomState.subscribers.delete(callback);
    };
  }, [atomState]);

  const setAtomValue = <AtomType>(newValue: AtomType) => {
    atomState.value = newValue;
    atomState.subscribers.forEach((callback: Function) => callback());
  };
  return [value, setAtomValue] as const;
};
