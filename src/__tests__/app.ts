import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('generator-personal:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../../generators/app'))
      .withPrompts({
        projectName: 'name',
        projectDescription: 'description',
        username: 'username'
      })
  })

  it('creates files', () => {
    assert.file([
      'name/.github/workflows/build.yml',
      'name/.vscode/settings.json',
      'name/src/index.ts',
      'name/.editorconfig',
      'name/.eslintrc.js',
      'name/.gitignore',
      'name/jest.config.js',
      'name/LICENSE',
      'name/package.json',
      'name/README.md',
      'name/README.zh-CN.md',
      'name/tsconfig.json'
    ])
  })
})
