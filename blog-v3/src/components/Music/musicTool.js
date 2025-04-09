import { reqMusicDetail, reqMusicDescription, reqMusicLyricById } from "@/api/music";

export const musicKey = "blog-music-player";

// 转码
/**
 * Base64编码和解码工具类
 */
export const Base64 = {
  /**
   * 将给定的字符串进行Base64编码
   * @param {string} v 待编码的字符串
   * @returns {string} 编码后的Base64字符串
   */
  encode: function (v) {
    // 使用window.btoa对URI编码的字符串进行Base64编码
    return window.btoa(window.encodeURIComponent(v));
  },

  /**
   * 将给定的Base64编码字符串进行解码
   * @param {string} v 编码后的Base64字符串
   * @returns {string} 解码后的原始字符串
   */
  decode: function (v) {
    // 使用window.atob对Base64编码的字符串进行解码，然后对结果进行URI解码
    return window.decodeURIComponent(window.atob(v));
  },
};

/**
 * 将键值对存储到本地存储中，并对键和值进行编码
 * 
 * @param {string} key - 要存储的数据的键
 * @param {*} value - 要的数据的存储值
 * @returns {void | string} - 如果键无效或值为空，则返回相应值，否则无返回
 */
export const _setLocalItem = function (key, value) {
  try {
    // 检查键是否为空或未定义，如果是，则不执行任何操作
    if (key === "" || key === undefined) {
      return;
    }
    // 当键存在时，根据值的不同情况处理
    if (key) {
      // 如果值为0，将其转换为字符串并编码，然后存储键（值将默认为null）
      if (value == 0) {
        value = JSON.stringify(value);
        localStorage.setItem(Base64.encode(key));
        return;
      }
      // 如果值为null、未定义或空字符串，则返回空字符串
      if (value === null || value === undefined || value === "") {
        return "";
      }
      // 编码
      let enObj = JSON.stringify(value);
      localStorage.setItem(Base64.encode(key), Base64.encode(enObj));
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 * 从本地存储中获取指定键的值
 * 此函数旨在从本地存储中读取与给定键关联的值，并将其解码和解析为JavaScript对象
 * 它首先检查提供的键是否有效，然后尝试从本地存储中获取与该键关联的值
 * 如果值存在，则对其进行Base64解码，然后解析为JSON对象，以确保数据的完整性和安全性
 * 
 * @param {string} key - 要从本地存储中获取的项的键
 * @returns {any} - 解析后的JavaScript对象，如果键无效或值不存在，则返回空字符串
 */
export const _getLocalItem = function (key) {
  try {
    // 检查键是否为空或无效
    if (key === null || key === "" || key === undefined) {
      return "";
    }
    // 如果键有效，尝试从本地存储中获取值
    if (key) {
      let value = localStorage.getItem(Base64.encode(key));
      // 检查获取的值是否为空或不存在
      if (value === null || value === undefined || value === "") {
        return "";
      } else {
        // 对值进行Base64解码
        value = Base64.decode(value);
        // 解析解码后的值为JavaScript对象并返回
        return JSON.parse(value);
      }
    }
  } catch (err) {
    // 如果发生错误，记录错误信息
    console.error(err);
  }
};

export const MODELLIST = [
  "RANDOM", // 随机
  "LISTLOOP", // 列表循环
  "SINGLECYCLE", // 单曲循环
];

export const PLAYTYPE = {
  CUSTOM: "CUSTOM", // 播放用户添加的歌曲
  TOP: "TOP", // 当前歌曲排行榜列表歌曲
};

export const LYRICTYPE = {
  COMMON: "COMMON",
  SPECIAL: "SPECIAL",
};

/*
 * @author: Zhang Yuming
 * @date: 2023-07-07 16:53:05
 * @params: index 下标 len 歌曲数组长度
 * @description: 随机播放返回不重复的下标
 */
const returnRandomNoRepeat = (index, len) => {
  if (len == 1) {
    return index;
  }
  let res = Math.floor(Math.random() * (len - 0) + 0);

  if (res == index) {
    returnRandomNoRepeat(index);
  } else {
    return res;
  }
};
/*
 * @author: Zhang Yuming
 * @date: 2023-07-04 10:09:57
 * @params: len 歌曲列表长度 index 当前歌曲下标 playType 播放模式 isPlayNext 是下一首还是上一首
 * @description: 返回下一首播放的歌曲
 */
export function getNextMusic(len, index, playType, isPlayNext) {
  let newIndex = 0;
  switch (playType) {
    // 随机
    case "RANDOM":
      newIndex = returnRandomNoRepeat(index, len);
      if (newIndex == index) {
        newIndex = returnRandomNoRepeat(index, len);
      }
      break;
    // 列表循环
    case "LISTLOOP":
      if (isPlayNext) {
        if (index == len - 1) {
          newIndex = 0;
        } else if (index != -1) {
          newIndex = index + 1;
        } else {
          newIndex = 0;
        }
      } else {
        if (index == 0) {
          newIndex = len - 1;
        } else if (index != -1) {
          newIndex = index - 1;
        } else {
          newIndex = 0;
        }
      }
      break;
    // 单曲循环
    case "SINGLECYCLE":
      newIndex = index;
      break;
  }

  return newIndex;
}

/**
 * 给小于10的数字 + 0
 * @param {*} time
 * @returns time
 */
export function addZero(time) {
  if (time >= 0 && time < 10) {
    time = "0" + time;
  }
  return time;
}

/*
 * @author: Zhang Yuming
 * @date: 2023-06-26 10:25:43
 * @params: time 时间 s
 * @description: 返回歌曲时间
 */
export function calcMusicTime(time) {
  // 这里就按照分和秒来
  let minutes = 0,
    second = 0;

  if (!time) {
    return `${addZero(minutes)}:${addZero(second)}`;
  }

  minutes = Math.floor(time / 60);
  second = Math.floor(time % 60);
  return `${addZero(minutes)}:${addZero(second)}`;
}

/*
 * @author: Zhang Yuming
 * @date: 2023-06-26 16:26:53
 * @params: curent 播放到哪儿了 durattion 总时长
 * @description: 计算歌曲播放百分比
 */
export function calcMusicSchedule(current, duration) {
  return Math.round((current / duration) * 10000) / 100;
}

/*
 * @author: Zhang Yuming
 * @date: 2023-10-23 13:33:46
 * @params: progress 进度 duration 播放时长
 * @description: 通过进度计算播放的时长
 */
export function calcMusicCurrentTime(progress, duration) {
  return Math.round(progress * duration) / 100;
}

/**
 * 根据歌曲id获取歌曲详情
 * @param {*} id
 */
export const getMusicDetail = async (id) => {
  const res = await reqMusicDetail({
    id,
    level: "exhigh",
  });
  if (res.code == 200) {
    // 设置音乐详情 播放器通过监听音乐的id 进行音乐播放
    return res.data[0];
  }
};

export const getMusicDescription = async (id) => {
  const res = await reqMusicDescription(id);
  if (res.code == 200) {
    // 设置音乐详情 播放器通过监听音乐的id 进行音乐播放
    return res.songs;
  }
};

export const getLyric = async (id) => {
  const res = await reqMusicLyricById(id);
  if (res.code == 200) {
    let lyricArr = res.lrc.lyric.split("\n");
    const notNullLyricArr = [];
    const timeList = [];
    lyricArr.forEach((v) => {
      let arr = v.split("]");
      let timeArr = arr[0].replace("[", "").split(":");
      if (arr[1] && arr[0]) {
        // 不为空才收集歌词
        timeList.push((timeArr[0] - 0) * 1000 * 60 + (timeArr[1] - 0) * 1000);
        notNullLyricArr.push(arr[1]);
      }
    });
    return {
      lyricList: notNullLyricArr, // 歌词列表
      lyricTimeList: timeList, // 歌词时间列表
    };
  }
};
