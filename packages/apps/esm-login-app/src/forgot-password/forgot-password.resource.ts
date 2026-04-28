import { openmrsFetch } from '@openmrs/esm-framework';

export async function requestPasswordReset(username: string): Promise<void> {
  try {
    await openmrsFetch('/ws/rest/v1/passwordreset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
  } catch {
    // Swallow the error — we always show success to avoid username enumeration
  }
}
