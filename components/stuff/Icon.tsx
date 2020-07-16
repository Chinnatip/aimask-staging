import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  //TODO :change any to IconDefinition
  fill: any
}

const Icon = ({ fill }: Props) => {
  return <FontAwesomeIcon icon={fill} className="mr-3 fa-show" />
}

export default Icon
