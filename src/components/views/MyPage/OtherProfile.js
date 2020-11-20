import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { getUserInfo } from "_actions/user_action";
import BlueBtn from "components/fragments/BlueBtn";
import WhiteBtn from "components/fragments/WhiteBtn";
import { getFollow, setFollow, unFollow } from "_actions/follow_action";
import FollowerModal from "components/views/MyPage/FollowerModal";
import FollowingModal from "components/views/MyPage/FollowingModal";
import "css/modal.scss";
import "css/common.scss";
import "css/mypage.scss";



function OtherProfile(props) {
  
  var UserInfo = useSelector(state => state.user);
  
  const [IsFollow, setIsFollow] = useState(false);
  const [FollowingOpen, setFollowingOpen] = useState(false);
  const [FollowerOpen, setFollowerOpen] = useState(false);
  const ProfileImg = process.env.REACT_APP_IMAGE_URL + UserInfo.userImg;
  const UserName = UserInfo.otheruserName;
  const JourneyType = UserInfo.otherjourneyType;
  const LifeStyle = UserInfo.otherlifeStyle;

  const dispatch = useDispatch();
  const body = {
    id: UserInfo.userId,
    name: UserInfo.userName,
    img: UserInfo.userImg,
    otherId: UserInfo.otheruserId,
    otherName: UserName,
    otherImg: UserInfo.otheruserImg
  }

  const onClickSetFollow = () => {
    var action;
    if(!IsFollow) {
      action = setFollow(body)
    }
    else {
      action = unFollow(body)
    }
    dispatch(action).then((response) => setIsFollow(response.payload.isFollow));
  }
  
 

  useEffect(() => {
    dispatch(getFollow(body)).then((response) => setIsFollow(response.payload.isFollow));
    dispatch(getUserInfo(UserInfo.otheruserId));
  }, []);

  return (
    <>
        <div className="mypage-info">
          <img className="mypage-profile-img" src={ProfileImg} alt="userprofile" />
          <div className="mypage-profile-contents">
            <div className="mypage-profile-first">
              <span className="mypage-username">{UserName}</span>
              {IsFollow ? <BlueBtn onClick={onClickSetFollow}/> : <WhiteBtn onClick={onClickSetFollow}/>}
            </div>
            <div className="mypage-profile-others">
            <span className="mypage-profile-text follow" onClick={() => {setFollowerOpen(true)}}>팔로워</span>
              <FollowerModal isOpen={FollowerOpen} close={() => {setFollowerOpen(false)}} userId={UserInfo.userId}/>
              <span className="mypage-profile-text margin">1000</span>
              <span className="mypage-profile-text follow" onClick={() => {setFollowingOpen(true)}}>팔로잉</span>
              <FollowingModal isOpen={FollowingOpen} close={() => {setFollowingOpen(false)}} userId={UserInfo.userId}/>
              <span className="mypage-profile-text">1000</span>
            </div>
            <div className="mypage-profile-others">
              <span className="mypage-profile-text">Journey Type</span>
              <span className="common-category-badge yellow">{JourneyType}</span>
            </div>
            <div className="mypage-profile-others">
              <span className="mypage-profile-text">Life Style</span>
              <span className="common-category-badge purple">{LifeStyle}</span>
            </div>
          </div>
        </div>
    </>
  );
}

export default OtherProfile;

 