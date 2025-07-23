
import Modal from "@/components/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  nama: string;
  deskripsi: string;
  harga: string;
  imageUrl: string;
};

export default function ProdukDetailModal({ isOpen, onClose, nama, deskripsi, harga, imageUrl }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={nama}>
      <div className="text-center space-y-3">
        <img src={imageUrl} alt={nama} className="w-full h-full object-cover rounded" />
        <p className="text-gray-700">{deskripsi}</p>
        <p className="font-semibold text-lg">Rp{harga}</p>
      </div>
    </Modal>
  );
}
