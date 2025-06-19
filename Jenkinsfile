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
                sh "curl -X GET ${env.https://api.render.com/deploy/srv-d1a7fc2li9vc73asi0og?key=5PlyRLAlyfQ}"
            }
        }
    }

    post {
        always {
            echo "Milestone 2 pipeline complete."
        }
    }
}
