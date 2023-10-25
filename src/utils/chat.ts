import constants from "@src/constants/constants";
import { ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import { ChatPartner } from "@src/store/chat/chatTypes";

export const getPartnerName = (partnerItem: ChatPartner) => {
  if (!partnerItem) return null;
  return constants.id === ID_SUPPLIER_RESPONSE
    ? Object.entries(partnerItem).reduce((acc: string, entry: any) => {
        const [key, value] = entry;
        if (value) return acc ? `${acc}${key === "company_name" ? ` (${value})` : ` ${value}`}` : value;
        return acc;
      }, "")
    : partnerItem.first_name;
};

export default "chat fn";
