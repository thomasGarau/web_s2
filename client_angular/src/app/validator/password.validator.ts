import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(group: FormGroup): {[key: string]: any} | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
}
