const summary = (argument) => {
  if (argument.kind === "ActionArgument") {
    return (
      `In the current circumstances "${argument.R}"; ` +
      `We should perform action "${argument.A}"; ` +
      `Which will result in new circumstances "${argument.S}"; ` +
      `Which will realise goal "${argument.G}"; ` +
      `Which will promote value "${argument.V}".`
    );
  }
  if (argument.kind === "ExpertOpinionArgument") {
    return (
      `"${argument.E}" is an expert in subject domain "${argument.D}" ` +
      `containing proposition "${argument.A}". ` +
      `"${argument.E}" asserts that "${argument.A}" is true. ` +
      `Therefore "${argument.A}" is true.`
    );
  }
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac dolor sit amet sem sagittis convallis non ac sem. Mauris id sagittis enim. Mauris sed lorem quis ipsum volutpat convallis.";
};

export default summary;
