const lab = require('../../lib/lab');

Page({
    data: {
        labs: [
            { id: 'config', title: '实验准备：配置请求域名' },
            { id: 'https', title: '实验一：HTTPS' },
            { id: 'session', title: '实验二：会话' },
            { id: 'websocket', title: '实验三：WebSocket' },
            { id: 'game', title: '实验四：剪刀石头布小游戏' }
        ],
		done: lab.getFinishLabs(),
		isSpeaking: false
    },

    onShow() {
        this.setData({ done: lab.getFinishLabs() });
    },
    record: function() {
		console.log('emit start'); 
		//正在录音时，显示话筒图片...
		this.setData({ isSpeaking: true });
		// var timer = setTimeout(() => {
		wx.startRecord({
			success: res => {
				console.log('start recording'); 
				
				var tempFilePath = res.tempFilePath; 
				console.log(tempFilePath);
				wx.saveFile({
					tempFilePath: tempFilePath,
					success: function(res) {
						var saveFilePath = res.saveFilePath;
						console.log('保存文件的路径'+saveFilePath)
					}
				});
			},
			fail: function(res) {
				//录音失败
				console.log(res);
			}
		})
		// }, 200); 

    },
    playVoice:function() {
        console.log("click");
        wx.getSavedFileList({
            success: function(res) {
                var filePath = res.fileList[0].filePath;
                wx.playVoice({
                    filePath: filePath,
                    success: function(){
                        console.log('播放完毕'); 
                    },
                    fail: res => {
                        console.log(res);
                    }
                })
            }
        })
    },
    recordEnd: function() {
		console.log('emit end'); 

		//结束录音，图片消失...
		this.setData({ isSpeaking: false });
		setTimeout(() => {
			wx.stopRecord();
		}, 500); 
    },
    clear() {
        lab.clear();
        this.setData({ done: lab.getFinishLabs() });
    },
    
});