import { Provider } from 'react-redux';
// import 'taro-ui/dist/style/index.scss'
// import 'taro-ui/dist/style/components/button.scss'
import 'taro-ui/dist/style/index.scss'
import configStore from './store';
import './app.scss'
 
const store = configStore()
export default (props) => {
  return <Provider store={store}>
  {props.children}
</Provider>
}