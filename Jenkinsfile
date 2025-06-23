pipeline {
    agent any

    environment {
        RENDER_DEPLOY_HOOK = 'https://api.render.com/deploy/srv-d1a7fc2li9vc73asi0og?key=5PlyRLAlyfQ'
        RENDER_URL = 'https://gallery-y43o.onrender.com'
        SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy to Render') {
            steps {
                sh "curl -X GET '${RENDER_DEPLOY_HOOK}'"
            }
        }

        stage('Notify Slack') {
            steps {
                script {
                    def message = "✅ *Build #${env.BUILD_NUMBER}* deployed!\\n🌍 Live: ${env.RENDER_URL}"
                    sh """
                        curl -X POST -H 'Content-type: application/json' \
                        --data '{"text": "${message}"}' \
                        '${SLACK_WEBHOOK_URL}'
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed."
        }

        failure {
            mail to: 'robin.adhola@student.moringaschool.com',
                 subject: "Build Failed - #${BUILD_NUMBER}",
                 body: "Build ${BUILD_NUMBER} failed. Visit ${BUILD_URL} for logs."

            script {
                def failMessage = "❌ *Build #${env.BUILD_NUMBER}* failed. Check logs: ${env.BUILD_URL}"
                sh """
                    curl -X POST -H 'Content-type: application/json' \
                    --data '{"text": "${failMessage}"}' \
                    '${SLACK_WEBHOOK_URL}'
                """
            }
        }
    }
}
