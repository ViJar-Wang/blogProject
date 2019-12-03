// const USER_ID = parseInt(Math.random() * 1000)
function generateTime() {
  const timeNow = new Date();
  const hours = timeNow.getHours();
  const minutes = timeNow.getMinutes();
  const seconds = timeNow.getSeconds();
  let timeString = '' + hours;
  timeString += (minutes < 10 ? ':0' : ':') + minutes;
  timeString += (seconds < 10 ? ':0' : ':') + seconds;
  return timeString
}

const mockData = [{
    time: generateTime(),
    type: 'system',
    label: 'System',
    message: '终端初始化.......................'
  },
  {
    time: generateTime(),
    type: 'warning',
    label: 'warning',
    message: 'This is a Waning Message!'
  },
  {
    time: generateTime(),
    type: 'error',
    label: 'Error',
    message: '哎呀，出问题了!'
  },
  {
    time: generateTime(),
    type: 'success',
    label: 'Success',
    message: '放轻松!骗你的,加载成功!'
  },
  {
    time: generateTime(),
    type: 'info',
    label: 'Name',
    message: 'Wenjie Wang'
  },
  {
    time: generateTime(),
    type: 'info',
    label: 'Sex',
    message: '男'
  },
  {
    time: generateTime(),
    type: 'info',
    label: 'Age',
    message: '21'
  },
  {
    time: generateTime(),
    type: 'info',
    label: 'Adress',
    message: 'HuNan'
  }
]

const taskList = {
  echo: {
    description: 'Echoes input',
    echo(pushToList, input) {
      input = input.split(' ')
      input.splice(0, 1)
      const p = new Promise(resolve => {
        pushToList({
          time: generateTime(),
          label: 'Echo',
          type: 'success',
          message: input.join(' ')
        });
        resolve({
          type: 'success',
          label: '',
          message: ''
        })
      })
      return p
    }
  },
  defaultTask: {
    description: 'this is default task.',
    defaultTask(pushToList) {
      let i = 0;
      const p = new Promise(resolve => {
        const interval = setInterval(() => {
          mockData[i].time = generateTime()
          pushToList(mockData[i]);
          i++
          if (!mockData[i]) {
            clearInterval(interval)
            resolve({
              type: 'success',
              label: 'Success',
              message: '测试成功!'
            })
          }
        }, 1000);
      })
      return p
    }
  },
  open: {
    description: 'Open a specified url in a new tab.',
    open(pushToList, input) {
      const p = new Promise((resolve, reject) => {
        let url = input.split(' ')[1]
        if (!url) {
          reject({
            type: 'error',
            label: 'Error',
            message: 'a url is required!'
          })
          return
        }
        pushToList({
          type: 'success',
          label: 'Success',
          message: 'Opening'
        })

        if (input.split(' ')[1].indexOf('http') === -1) {
          url = 'http://' + input.split(' ')[1]
        }
        window.open(url, '_blank')
        resolve({
          type: 'success',
          label: 'Done',
          message: 'Page Opened!'
        })
      })
      return p;
    }
  },
  back: {
    description: '返回博客首页.',
    back(pushToList, input) {
       input = input.split(' ')
        const p = new Promise((resolve, reject) => {
        // pushToList({ time: generateTime(), label: 'Echo', type: 'success', message: input.join(' ') });
        window.location.href = "https://vijar-wang.github.io";
        // 通过resolve一个message对象通知组件任务结束
        resolve({ type: 'success', label: '', message: '' })
        })
        // window.open(url, '_blank')
      return p;
    }
  }

}
