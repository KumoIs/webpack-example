export default function Header() {
  var dom = document.getElementById('root');
  var header = document.createElement('div')
  header.innerText = "Header Component"
  dom.append(header)
};

