pipeline {
  agent any
  stages {
        stage('TEST') {
          steps {
            sh 'yarn run test'
        }
      }

    stage('BUILD') {
      when {
        branch 'main'
      }
      post {
        failure {
          echo 'This build has failed. See logs for details.'
        }

      }
      steps {
        retry(count: 3) {
          timeout(time: 30, unit: 'MINUTES') {
            sh 'yarn run build'
            sh 'cat ./dist/bundle.json'
          }

        }

      }
    }

    stage('DEPLOY') {

      when {
        branch 'main'
      }
      parallel {
            stage('Upload') {
              steps {
                sh 'akamai list'
                sh "akamai edgeworkers"
              }
            }

            stage('Push') {
              steps {
                sh 'yarn run push-staging --edgerc ${edgerc}'
              }
            }
     }
      }

  }
    environment {
    edgerc = credentials('edgerc')
  }

}
