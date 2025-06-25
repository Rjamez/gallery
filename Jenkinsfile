pipeline {
    agent any

    tools {
        nodejs "NodeJS" 
    }

    environment {
        MONGO_URI = credentials('mongo-uri')
        SLACK_WEBHOOK = credentials('slack-webhook-url')
        NOTIFY_EMAIL = 'robin.adhola@student.moringaschool.com' 
        RENDER_URL = 'https://gallery-y43o.onrender.com'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
            post {
                failure {
                    mail to: "${env.NOTIFY_EMAIL}",
                         subject: "❌ Jenkins Build ${env.BUILD_ID} Test Failure",
                         body: "Tests failed. Visit Jenkins for details."
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Build complete (nothing to compile for now).'
            }
        }

        stage('Deploy (Render Auto Deploy)') {
            steps {
                echo 'Render auto-deploy will handle this on GitHub push.'
            }
        }

        stage('Notify Slack') {
            steps {
                script {
                    def slackMessage = "✅ *Build ${env.BUILD_ID} succeeded!* 🎉\nDeployed: ${env.RENDER_URL}"
                    sh """
                        curl -X POST -H 'Content-type: application/json' \
                        --data '{"text": "${slackMessage}"}' \
                        ${env.SLACK_WEBHOOK}
                    """
                }
            }
        }
    }
}
