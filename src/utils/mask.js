export function maskPhone(phone = "") {
  return phone.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2");
}

export function maskStudentId(id = "") {
  if (id.length < 8) return id;
  return `${id.slice(0, 3)}****${id.slice(-3)}`;
}

export function maskContact(contact = "") {
  if (/^\d{11}$/.test(contact)) return maskPhone(contact);
  if (contact.includes("@")) {
    const [name, domain] = contact.split("@");
    return `${name.slice(0, 2)}***@${domain}`;
  }
  return `${contact.slice(0, 2)}***`;
}
