import Image from "next/image";
import toast from "react-hot-toast";


export default function ImageHandle({ link, setLink }) {

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData;
      data.set('file', files[0]);
      await toast.promise(fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then(response => {
        if (response.ok) {
          return response.json().then(link => {
            setLink(link);
          })
        }
        throw new Error(err);
      }), {
        loading: 'Uploading...',
        success: 'Upload complete!',
        error: 'Sorry an error has occurred. Please try again. ',
      })
    }
  }
  return (
    <div>
      <>
        {link && (
          <Image className="rounded-xl w-full h-full mb-1" src={link} width={120} height={120} alt={'avatar'} />
        )}
        {!link && (
          <div className="bg-gray-200 text-center p-4 text-gray-500 rounded-lg mb-1">
            No image
          </div>
        )}
        <label>
          <input onChange={handleFileChange} accept="image/*" type="file" className="hidden" />
          <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Edit</span>
        </label>
      </>
    </div>
  );
}