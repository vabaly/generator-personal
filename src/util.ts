export interface RepositoryInfo {
  gitUrl: string
  homePageUrl: string
  issuesUrl: string
  issueOpenUrl: string
  buildStatusImage: string
}

export function generateRepositoryInfo(
  username: string,
  projectName: string
): RepositoryInfo {
  const gitUrl = `git@github.com:${username}/${projectName}.git`
  const homePageUrl = `https://github.com/${username}/${projectName}`
  const issuesUrl = `${homePageUrl}/issues`
  const issueOpenUrl = `${issuesUrl}/new`
  const buildStatusImage = `${homePageUrl}/workflows/build/badge.svg`

  return { gitUrl, homePageUrl, issuesUrl, issueOpenUrl, buildStatusImage }
}
