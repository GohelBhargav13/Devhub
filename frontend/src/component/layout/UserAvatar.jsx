import Avatar from "react-avatar"
const UserAvatar = ({ username,size }) => {
  return (
    <div>
      <Avatar name={username} size={`${ size ? size : "40" }`} round={true} className="md:size-40 mt-0.5 md:mt-0" />
    </div>
  )
}

export default UserAvatar