/* eslint-disable react/prop-types */


const Button = ({ children, btnType, loading }) => {
  return (
    <button disabled={loading} className="btn" type={btnType}>{loading ? 'Loading...' : children}</button>
  )
}

export default Button