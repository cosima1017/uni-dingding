/**
 *
 * @param {*} options 请求参数
 * @returns {Promise}
 */
export function request(options) {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
