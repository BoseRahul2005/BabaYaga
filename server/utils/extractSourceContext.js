exports.extractSourceContext= (sourceCode,changedLines, contextSize)=>{
    const startLine= changedLines.startLine;
    const lineCount= changedLines.lineCount;
    const splittedCode= sourceCode.split("\n");
    const contextStart= Math.max(0, startLine-1-contextSize);
    const contextEnd= Math.min(splittedCode.length, (startLine-1)+lineCount+contextSize);
    return splittedCode.slice(contextStart, contextEnd).join("\n");
}