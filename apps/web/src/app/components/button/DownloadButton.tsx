import { getSanityFileUrl } from 'utils/getSanityFileUrl';
import { Button } from 'app/components/button';

const DownloadButton = ({ href, text }) => {

  const downloadUrl = getSanityFileUrl(href);

  return (
    <Button
      isDownload
      isFullWidth
      //@ts-ignore
      href={downloadUrl.url}
    >
      {text}
    </Button>
  )
}

export { DownloadButton }