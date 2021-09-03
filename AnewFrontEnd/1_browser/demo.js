const tpl = 'abcdef';
const input = 'xxabcdefxx'

class MatchString {
    constructor(option = {}) {
        this.tpl = option.tpl
        this.tplType = []
    }

    toMatch(params) { // O(n^2)
        const _tpl = this.tpl;
        const _tplType = this.tplType;
        let conti = true;
        for(let i = 0; i < params.length ; i++) {
            for(let j = 0 ; j < _tpl.length ; j++) {
                if (params[i] === _tpl[i]) {
                    // 匹配往表里推计数
                    _tplType.push(true)
                } else {
                    conti = false;
                }
                // 列表数等于模板长度，连续不中断，全匹配，返回true
                if(_tplType.length === _tpl.length && conti && _tplType.some( res => res)){
                    return true;
                }
            }

        }
    }
}
const matchString = new MatchString(tpl)
console.log(matchString.toMatch(input))