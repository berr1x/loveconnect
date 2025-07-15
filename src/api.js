const API_URL = 'https://loveconnectai.ru/api';

export async function uploadMusic(files) {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  const res = await fetch(`${API_URL}/upload/music`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Ошибка загрузки файлов');
  return await res.json(); // { sessionId }
}

export async function uploadPartnerMusic(files, sessionId) {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  formData.append('sessionid', sessionId);
  const res = await fetch(`${API_URL}/upload/partner-music`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Ошибка загрузки файлов партнёра');
  return await res.json();
}

export async function getResult(sessionId) {
  const res = await fetch(`${API_URL}/result`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionid: sessionId }),
  });
  if (!res.ok) throw new Error('Ошибка получения результата');
  return await res.json();
} 