import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getStore, updateStore } from '@/services//storeService';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import type { Store } from '@/types/Store';

vi.mock('firebase/firestore', async () => {
  return {
    getFirestore: vi.fn(() => ({})), // tambahkan ini
    doc: vi.fn(() => 'mockDocRef'),
    getDoc: vi.fn(),
    updateDoc: vi.fn(),
  };
});


describe('storeService', () => {
  const mockedStore: Store = {
    nama: 'Toko Sejahtera',
    alamat: 'Jl. Damai No. 123',
    kontak: '08123456789',
    whatsApp: 'https://wa.me/08123456789',
    goFood: 'https://gofood.link',
    grabFood: 'https://grabfood.link',
    jadwal: 'Setiap hari 08:00 - 20:00',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getStore', () => {
    it('returns store data if document exists', async () => {
      (getDoc as any).mockResolvedValue({
        exists: () => true,
        data: () => mockedStore,
      });

      const store = await getStore();
      expect(getDoc).toHaveBeenCalled();
      expect(store).toEqual(mockedStore);
    });

    it('returns null if document does not exist', async () => {
      (getDoc as any).mockResolvedValue({
        exists: () => false,
      });

      const store = await getStore();
      expect(store).toBeNull();
    });
  });

  describe('updateStore', () => {
    it('calls updateDoc with correct data (without id)', async () => {
      const mockData = { ...mockedStore, id: 'some-id' };

      await updateStore(mockData);
      expect(updateDoc).toHaveBeenCalledWith(expect.anything(), mockedStore);
    });
  });
});
