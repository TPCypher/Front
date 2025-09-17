import {ref} from "vue";

export const entropy = ref(0) // Entropy value
export const entropyLabel = ref('Too weak')
export const entropyColor = ref('text-red-600')
export const entropyBg = ref('')


export function checkGamme(password: string) : number {
    let R = 0;
    if (/[a-z]/.test(password)) R += 26;
    if (/[A-Z]/.test(password)) R += 26;
    if (/[0-9]/.test(password)) R += 10;
    if (/[^a-zA-Z0-9]/.test(password)) R += 32;
    return R;
}

export function checkEntropy(password: string) {
    const pwd = password
    if (!pwd) {
        entropy.value = 0
        entropyLabel.value = ''
        entropyColor.value = ''
        return
    }


    let gamme = checkGamme(pwd);

    entropy.value = pwd.length * Math.log2(gamme);

    if (entropy.value < 28) {
        entropyLabel.value = 'Very Weak';
        entropyColor.value = 'text-red-600';
        entropyBg.value = 'bg-red-600';
    } else if (entropy.value < 36) {
        entropyLabel.value = 'Weak'
        entropyColor.value = 'text-orange-500'
        entropyBg.value = 'bg-orange-500';
    } else if (entropy.value < 60) {
        entropyLabel.value = 'Reasonable'
        entropyColor.value = 'text-yellow-500'
        entropyBg.value = 'bg-yellow-500';
    } else if (entropy.value < 128) {
        entropyLabel.value = 'Strong'
        entropyColor.value = 'text-green-600'
        entropyBg.value = 'bg-green-600';
    } else {
        entropyLabel.value = 'Very Strong'
        entropyColor.value = 'text-green-800'
        entropyBg.value = 'bg-green-800';
    }
}
