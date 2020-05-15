import Generator, { Answers as InquirerAnswers } from 'yeoman-generator'
import chalk from 'chalk'
import yosay from 'yosay'

import { generateRepositoryInfo, RepositoryInfo } from './util'

interface Answers extends InquirerAnswers {
  projectName?: string
  projectDescription?: string
  username?: string
}

interface Project extends RepositoryInfo {
  name: string
  description: string
}

interface RenderInfo {
  username?: string
  project?: Project
}

class generator extends Generator {
  answers: Answers = {}
  renderInfo: RenderInfo = {}

  prompting() {
    this.log(yosay(`欢迎使用 ${chalk.red('generator-personal')} 脚手架！`))

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: '请输入要创建的项目名称：'
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: '请输入要创建的项目描述：'
      },
      {
        type: 'input',
        name: 'username',
        message: '请输入 Github 账号：'
      }
    ]

    return this.prompt(prompts).then(answers => {
      this.answers = answers
    })
  }

  configuring() {
    const {
      username = '',
      projectName = '',
      projectDescription = ''
    } = this.answers
    const repositoryInfo = generateRepositoryInfo(username, projectName)
    const project = {
      ...repositoryInfo,
      name: projectName,
      description: projectDescription
    }

    this.renderInfo = {
      username,
      project
    }
  }

  writing() {
    const { projectName = '' } = this.answers
    const renderInfo = this.renderInfo

    const scheme = this.templatePath('**/*')
    const dest = this.destinationPath(projectName)

    this.fs.copyTpl(
      scheme,
      dest,
      renderInfo,
      {},
      {
        globOptions: { dot: true }
      }
    )
  }

  install() {
    this.npmInstall()
  }

  end() {
    this.log('Done.')
  }
}

export = generator
