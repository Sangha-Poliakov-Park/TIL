VSC 단축키 CTRL+ALT+ARROW (복사)를 잘 쓰다가 갑자기 작동하지 않던 도중 reddit에서 해결책을 찾았다.  
[Reddit](https://www.reddit.com/r/Fedora/comments/r09ha6/ctrl_shift_alt_down_up_not_registering/)

정확한 이유는 모르겠으나, UI업데이트 이후 해당 shortcut이 디폴트로 gnome에 덧씌워진 것으로 추정된다.

dconf Editor를 다운받고
org -> gnome -> desktop -> wm -> keybindings 에서 해당 키를 차지하고 있는 기능을 찾아 공백으로 만들어준 후 다시 vsc 단축키를 변경해주었더니 해결 되었다.  