export const getCssVariableValue = (variableName: string): string => {
  const computedStyle = getComputedStyle(document.documentElement);
  return computedStyle.getPropertyValue(variableName).trim();
}

export const navigateTo = async (url: string) => {
  window.open(url, '_blank');
};