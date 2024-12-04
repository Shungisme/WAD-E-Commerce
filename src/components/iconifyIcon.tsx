import { Icon, IconProps } from '@iconify/react';



const IconifyIcon = (props:IconProps) => {
    const {icon,...rest} = props
    return <Icon icon={icon} fontSize={"25px"} {...rest}/>
}


export default IconifyIcon