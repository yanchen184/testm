document.addEventListener('DOMContentLoaded', function() {
    // 獲取DOM元素
    const welcomeScreen = document.getElementById('welcome-screen');
    const questionScreen = document.getElementById('question-screen');
    const loadingScreen = document.getElementById('loading-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progress = document.getElementById('progress');
    const loadingText = document.getElementById('loading-text');
    const personalityName = document.getElementById('personality-name');
    const resultDetails = document.getElementById('result-details');
    const prankReveal = document.getElementById('prank-reveal');
    const shareBtn = document.getElementById('share-btn');

    // 問題列表
    const questions = [
        {
            question: "你喜歡在空閒時間做什麼？",
            options: [
                "閱讀書籍或觀看紀錄片",
                "與朋友聚會、參加社交活動",
                "獨自一人散步或冥想",
                "從事具有挑戰性的活動或遊戲"
            ]
        },
        {
            question: "面對困難時，你通常會怎麼做？",
            options: [
                "仔細分析問題並尋找最佳解決方案",
                "尋求他人的建議和支持",
                "相信自己的直覺，跟隨內心的感受",
                "迅速採取行動，邊做邊調整"
            ]
        },
        {
            question: "你如何看待規則和傳統？",
            options: [
                "規則和傳統是社會穩定的基礎",
                "規則很重要，但有時需要靈活處理",
                "更重視個人價值觀而非外部規則",
                "喜歡挑戰常規，尋找創新的方法"
            ]
        },
        {
            question: "在團隊中，你通常扮演什麼角色？",
            options: [
                "計劃和組織者，確保一切按計劃進行",
                "支持者和協調者，關注團隊和諧",
                "創意思考者，提供新穎的想法",
                "執行者和問題解決者，確保達成目標"
            ]
        },
        {
            question: "你更喜歡哪種類型的工作環境？",
            options: [
                "結構化且有清晰流程的環境",
                "友好、合作的團隊環境",
                "允許創意和獨立思考的環境",
                "充滿挑戰和競爭的環境"
            ]
        }
    ];

    // 愚人節訊息
    const prankMessages = [
        "你是一個小寶！而且是非常小的那種寶!!!!!!"
    ];


    // 假的載入訊息
    const loadingMessages = [
        "分析個性特質中...",
        "比對心理學模型...",
        "處理複雜特質組合...",
        "計算相似性指數...",
        "生成詳細報告..."
    ];

    let currentQuestion = 0;
    const userAnswers = [];

    // 開始測試
    startBtn.addEventListener('click', function() {
        welcomeScreen.classList.remove('active');
        questionScreen.classList.add('active');
        showQuestion(currentQuestion);
    });

    // 顯示問題
    function showQuestion(index) {
        // 更新進度條
        const progressPercentage = (index / questions.length) * 100;
        progress.style.width = progressPercentage + '%';
        
        // 顯示問題
        const question = questions[index];
        questionText.textContent = question.question;
        
        // 清空選項容器
        optionsContainer.innerHTML = '';
        
        // 添加選項
        question.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', function() {
                // 移除其他選項的選中狀態
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // 添加當前選項的選中狀態
                this.classList.add('selected');
                
                // 記錄答案
                userAnswers[index] = i;
                
                // 延遲一下，讓用戶看到選中狀態
                setTimeout(() => {
                    // 如果還有問題，顯示下一題
                    if (index < questions.length - 1) {
                        currentQuestion++;
                        showQuestion(currentQuestion);
                    } else {
                        // 否則，顯示載入畫面並準備結果
                        showLoadingScreen();
                    }
                }, 500);
            });
            
            optionsContainer.appendChild(optionElement);
        });
    }

    // 顯示載入畫面
    function showLoadingScreen() {
        questionScreen.classList.remove('active');
        loadingScreen.classList.add('active');
        
        let messageIndex = 0;
        
        // 顯示不同的載入訊息
        const loadingInterval = setInterval(() => {
            loadingText.textContent = loadingMessages[messageIndex];
            messageIndex = (messageIndex + 1) % loadingMessages.length;
        }, 2000);
        
        // 3-6秒後顯示結果（隨機時間，增加真實感）
        setTimeout(() => {
            clearInterval(loadingInterval);
            showResultScreen();
        }, 3000 + Math.random() * 3000);
    }

    // 顯示結果畫面（愚人節惡作劇）
    function showResultScreen() {
        loadingScreen.classList.remove('active');
        resultScreen.classList.add('active');
        
        // 隨機選擇一個性格類型名稱（這裡可以更創意一些）
        const personalityTypes = [
            "一個小寶"        ];
        
        // 顯示一個假的性格類型
        personalityName.textContent = personalityTypes[Math.floor(Math.random() * personalityTypes.length)];
        
        // 顯示一些假的詳細分析
        resultDetails.innerHTML = `
            <p>根據您的回答，我們分析出您具有以下特質：</p>
            <ul>
                <li>思考方式: 理性與直覺並重</li>
                <li>社交傾向: 適應性強，能在不同場合展現不同面向</li>
                <li>決策風格: 謹慎但不拖延</li>
                <li>工作習慣: 注重效率和品質</li>
                <li>壓力應對: 能夠在壓力下保持冷靜</li>
            </ul>
            <p>您的性格組合在人群中相對少見，約占總人口的12%。</p>
        `;
        
        // 等待幾秒後顯示愚人節惡作劇
        setTimeout(() => {
            // 隨機選擇一個愚人節訊息
            const prankMessage = prankMessages[0];
            
            // 更新結果內容
            resultDetails.style.display = 'none';
            prankReveal.classList.remove('hidden');
            
            // 設置愚人節訊息
            document.getElementById('prank-message').textContent = prankMessage;
            
            console.log('顯示愚人節訊息:', prankMessage); // 測試用
        }, 3000);
    }

    // 分享按鈕功能
    shareBtn.addEventListener('click', function() {
        // 創建分享URL
        const shareUrl = window.location.href.split('?')[0] + '?prank=true';
        
        // 複製鏈接到剪貼板
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('鏈接已複製到剪貼板！快分享給你的朋友吧！');
        }).catch(err => {
            console.error('無法複製鏈接: ', err);
            alert('分享鏈接: ' + shareUrl);
        });
    });

    // 檢查URL參數，如果有prank=true，直接顯示結果（用於分享功能）
    function checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('prank') === 'true') {
            welcomeScreen.classList.remove('active');
            resultScreen.classList.add('active');
            
            // 直接顯示愚人節訊息
            resultDetails.style.display = 'none';
            prankReveal.classList.remove('hidden');
            
            // 使用固定的愚人節訊息
            document.getElementById('prank-message').textContent = prankMessages[0];
            console.log('從URL顯示愚人節訊息:', prankMessages[0]); // 測試用
        }
    }

    // 初始化檢查
    checkUrlParams();
});