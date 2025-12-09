const PASSWORD_RULE: RegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

interface RegexRules {
  readonly PASSWORD_RULE: RegExp;
}

const REGEX: RegexRules = {
  PASSWORD_RULE,
};

export default REGEX;
