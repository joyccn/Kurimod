from dataclasses import dataclass, fields
from typing import Optional, List, Union, TypeVar


T = TypeVar("T")


@dataclass(slots=True)
class Identifier:
    inline_message_id: Optional[Union[str, List[str]]] = None
    chat_id: Optional[Union[Union[int, str], List[Union[int, str]]]] = None
    message_id: Optional[Union[int, List[int]]] = None
    from_user_id: Optional[Union[Union[int, str], List[Union[int, str]]]] = None

    def matches(self, update: "Identifier") -> bool:
        if self.inline_message_id is not None:
            if not self._check_match(self.inline_message_id, update.inline_message_id):
                return False
        
        if self.chat_id is not None:
            if not self._check_match(self.chat_id, update.chat_id):
                return False
        
        if self.message_id is not None:
            if not self._check_match(self.message_id, update.message_id):
                return False
        
        if self.from_user_id is not None:
            if not self._check_match(self.from_user_id, update.from_user_id):
                return False
                
        return True

    @staticmethod
    def _check_match(pattern_value: Union[T, List[T]], update_value: Union[T, List[T]]) -> bool:
        if isinstance(update_value, list):
            if isinstance(pattern_value, list):
                return any(item in pattern_value for item in update_value)
            return pattern_value in update_value
        if isinstance(pattern_value, list):
            return update_value in pattern_value
        return update_value == pattern_value

    def count_populated(self) -> int:
        count = 0
        if self.inline_message_id is not None: count += 1
        if self.chat_id is not None: count += 1
        if self.message_id is not None: count += 1
        if self.from_user_id is not None: count += 1
        return count

