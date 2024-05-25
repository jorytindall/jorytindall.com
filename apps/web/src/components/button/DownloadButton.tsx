import { getSanityFileUrl } from 'utils/getSanityFileUrl';
import { Button } from 'components/button';

const DownloadButton = ({ href, text, className }) => {

  const downloadUrl = getSanityFileUrl(href);

  return (
    <Button
      isDownload
      //@ts-ignore
      href={downloadUrl.url}
      className={className}
    >
      {text}
    </Button>
  )
}

export { DownloadButton }