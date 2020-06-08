export default function Btn() {
    const btn = document.createElement('button')
    btn.innerHTML = '测试按钮';
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        let num = 0;
        const time = document.createElement('span')
        time.innerHTML = `current num: ${++num}`
        document.body.appendChild(time)
    })
}