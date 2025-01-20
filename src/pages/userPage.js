export const userPage = ({username, email, description}) => {
  return `
    <h1>
      ${username}
    </h1>
    <small>
      ${email}
    </small>
    <h4>
      ${description}
    </h4>
  `
}