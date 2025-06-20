pipeline {
    agent any

    environment {
        RENDER_DEPLOY_HOOK = 'https://api.render.com/deploy/srv-d1a7fc2li9vc73asi0og?key=5PlyRLAlyfQ'
        RENDER_URL = 'https://gallery-y43o.onrender.com'
        SLACK_CHANNEL = '#YourFirstName_IP1'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy to Render') {
            steps {
                sh "curl -X GET '${https://api.render.com/deploy/srv-d1a7fc2li9vc73asi0og?key=5PlyRLAlyfQ}'"
            }
        }

        stage('Notify Slack') {
            steps {
                slackSend(
                    channel: "${SLACK_CHANNEL}",
                    message: "✅ *Build #${BUILD_NUMBER}* deployed!\n🌍 Live: ${https://gallery-y43o.onrender.com}"
                )
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
        }
    }
}
