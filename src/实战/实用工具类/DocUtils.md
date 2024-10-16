#  DocUtils

## 自定义word模板工具类

```java
package com.ruoyi.system.util;

import com.ruoyi.common.config.RuoYiConfig;
import com.ruoyi.common.utils.DateUtils;
import com.ruoyi.common.utils.SizeUtil;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.common.utils.file.FileUtils;
import org.apache.poi.xwpf.usermodel.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.Map;

/**
 * @author hjc
 * @version 1.0
 * @className DocUtils
 * @description word文件工具类
 * @since 1.0
 **/
public class DocUtils {

    public static String parseWord(
            String modelFilePath,
            Map<String, String> dataMap) {

        if (StringUtils.isEmpty(modelFilePath)) {
            return "";
        }

        String after = modelFilePath.split("profile/upload/")[1];

        String preName = FileUtil.inputFileName(after);
        String afterName = FileUtil.inputFileExtension(after);

        String dataPath = DateUtils.datePath();
        String name = preName + "_" + new Date().getTime() + "." + afterName;
        String savePath = RuoYiConfig.getProfile() + "/" + dataPath + "/" + name;

        String pa = RuoYiConfig.getProfile() + "/" + dataPath;

        File directory = new File(pa);
        if (!directory.exists()) {
            directory.mkdirs();
        }


        try {
            // 1. 打开现有的模板文件
            FileInputStream templateFile = new FileInputStream("/home/file/upload/" + after);
            XWPFDocument document = new XWPFDocument(templateFile);

            // 2. 创建一个包含要替换的数据的映射
            //Map<String, String> dataMap = new HashMap<>();
            //dataMap.put("{{Placeholder1}}", "Replace with Data1");
            //dataMap.put("{{Placeholder2}}", "Replace with Data2");

            // 3. 遍历文档中的段落和表格，替换占位符
            for (XWPFParagraph paragraph : document.getParagraphs()) {
                for (XWPFRun run : paragraph.getRuns()) {
                    String text = run.getText(0);
                    for (Map.Entry<String, String> entry : dataMap.entrySet()) {
                        if (text != null) {
                            text = text.replace(entry.getKey(), entry.getValue());
                        }
                    }
                    run.setText(text, 0);
                }
            }

            for (XWPFTable table : document.getTables()) {
                for (XWPFTableRow row : table.getRows()) {
                    for (XWPFTableCell cell : row.getTableCells()) {
                        for (XWPFParagraph paragraph : cell.getParagraphs()) {
                            for (XWPFRun run : paragraph.getRuns()) {
                                String text = run.getText(0);
                                for (Map.Entry<String, String> entry : dataMap.entrySet()) {
                                    if (text != null) {
                                        text = text.replace(entry.getKey(), entry.getValue());
                                    }
                                }
                                run.setText(text, 0);
                            }
                        }
                    }
                }
            }

            // 4. 保存生成的文档
            FileOutputStream output = new FileOutputStream(savePath);
            document.write(output);
            long size = output.getChannel().size();
            output.close();


            String proFileName = FileUtils.getName(savePath);
            String proFileType = FileUtils.getName(savePath).substring(FileUtils.getName(savePath).lastIndexOf(".") + 1);
            String proFileSize = SizeUtil.formatSize(size);
            //文件地址
            String proFileAddress = "/" + dataPath + "/" + name;

            // 5. 关闭模板文件
            templateFile.close();

            return proFileAddress;
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }

}

```

## 策略模式实现传参DocUtils

### 联系上下文对象

```java
package com.ruoyi.system.strategy;

import com.ruoyi.system.domain.NetBtnHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * 策略上下文,匹配类型type
 */
@Component
@RequiredArgsConstructor
public class SecurityCheckAssembler {
    private final BaselineCheckStrategy baselineCheckStrategy;
    private final PenetrationTestStrategy penetrationTestStrategy;
    private final VirusScanStrategy virusScanStrategy;

    //private static final Map<Integer, CheckStrategy> STRATEGY_MAP = new HashMap<>();
    //static {
    //     STRATEGY_MAP.put(0, baselineCheckStrategy);
    //     STRATEGY_MAP.put(1, new PenetrationTestStrategy());
    //     STRATEGY_MAP.put(3, new VirusScanStrategy());
    //}

    public Map<String, String> assembleMap(Integer type, String stage, NetBtnHistory netBtnHistory) {
        CheckStrategy strategy = null;
        switch (type){
            case 0:
                strategy = baselineCheckStrategy;
                break;
            case 1:
                strategy = penetrationTestStrategy;
                break;
            case 3:
                strategy = virusScanStrategy;
                break;
        }
        if(strategy==null){
            return new HashMap<>();
        }

        return strategy.assembleMap(stage,netBtnHistory);
    }
}

```

### 策略接口

```java
package com.ruoyi.system.strategy;

import com.ruoyi.system.domain.NetBtnHistory;

import java.util.Map;

/**
 * @author hjc
 * @version 1.0
 * @className CheckStrategy
 * @description 选择策略
 * @since 1.0
 **/
public interface CheckStrategy {

    /**
     * 选择策略
     * @param stage 阶段
     */
    Map<String, String> assembleMap(String stage, NetBtnHistory netBtnHistory);
}

```

### 策略接口实现01

```java
package com.ruoyi.system.strategy;

import cn.hutool.core.date.DateTime;
import com.ruoyi.system.domain.NetBtnHistory;
import com.ruoyi.system.domain.NetModelDisplay;
import com.ruoyi.system.service.INetBtnHistoryService;
import com.ruoyi.system.service.INetModelDisplayService;
import com.ruoyi.system.util.DateFormatUtil;
import com.ruoyi.system.util.DateUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * 基线核查策略实现
 */
@Component
@RequiredArgsConstructor
public class BaselineCheckStrategy implements CheckStrategy {
    private final INetModelDisplayService netModelDisplayService;
    private final INetBtnHistoryService netBtnHistoryService;

    @Override
    public Map<String, String> assembleMap(String stage, NetBtnHistory netBtnHistory) {
        HashMap<String, String> map = new HashMap<>();
        //默认间隔3天
        Integer interval = 3;
        NetModelDisplay netModelDisplay = netModelDisplayService.getByTypeAndStage(0, stage);
        if (netModelDisplay != null) {
            interval = netModelDisplay.getInterval();
        }
        switch (stage) {
            case "1":
                map.put("{{deptName}}", netBtnHistory.getDeptName());
                map.put("{{lastDate}}", DateUtils.addDay(interval));
                map.put("{{currentDate}}", new DateTime().toString("yyyy年MM月dd日"));
                break;
            case "2":
                NetBtnHistory lastSendRecord = netBtnHistoryService.getLastSendRecord(
                        new NetBtnHistory().setIp(netBtnHistory.getIp())
                                .setType(1).setDelFlag("0").setStage("1").setIsXiaFa(2)
                );
                String sendCurrentDate = "";
                String sendLastDate = "";
                if (ObjectUtils.isNotEmpty(lastSendRecord) && ObjectUtils.isNotEmpty(lastSendRecord.getUpdateTime())) {
                    sendCurrentDate = DateFormatUtil.parseDateString(lastSendRecord.getUpdateTime(), "yyyy年MM月dd日");
                    sendLastDate = DateFormatUtil.parseDateString(DateFormatUtil.addDays(lastSendRecord.getUpdateTime(), interval), "yyyy年MM月dd日");
                }
                map.put("{{deptName}}", netBtnHistory.getDeptName());
                map.put("{{sendCurrentDate}}", sendCurrentDate);
                map.put("{{sendLastDate}}", sendLastDate);
                map.put("{{lastDate}}", DateUtils.addDay(interval));
                map.put("{{currentDate}}", new DateTime().toString("yyyy年MM月dd日"));
                break;
            case "3":
                map.put("{{deptName}}", netBtnHistory.getDeptName());
                map.put("{{lastDate}}", DateUtils.addDay(interval));
                map.put("{{currentDate}}", new DateTime().toString("yyyy年MM月dd日"));
                break;
            default:
                // 处理无效的阶段
                break;
        }
        return map;
    }
}

```

### 策略接口实现02

```java
package com.ruoyi.system.strategy;

import cn.hutool.core.date.DateTime;
import com.ruoyi.system.domain.NetBtnHistory;
import com.ruoyi.system.domain.NetModelDisplay;
import com.ruoyi.system.service.INetBtnHistoryService;
import com.ruoyi.system.service.INetModelDisplayService;
import com.ruoyi.system.util.DateFormatUtil;
import com.ruoyi.system.util.DateUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * 渗透测试策略实现类
 */
@Component
@RequiredArgsConstructor
public class PenetrationTestStrategy implements CheckStrategy {
    private final INetModelDisplayService netModelDisplayService;
    private final INetBtnHistoryService netBtnHistoryService;
    @Override
    public Map<String, String> assembleMap(String stage, NetBtnHistory netBtnHistory) {
        HashMap<String, String> map = new HashMap<>();
        //默认间隔3天
        Integer interval = 3;
        NetModelDisplay netModelDisplay = netModelDisplayService.getByTypeAndStage(1, stage);
        if (netModelDisplay != null) {
            interval = netModelDisplay.getInterval();
        }
        switch (stage) {
            case "1":
                map.put("{{deptName}}", netBtnHistory.getDeptName());
                map.put("{{lastDate}}", DateUtils.addDay(interval));
                map.put("{{currentDate}}", new DateTime().toString("yyyy年MM月dd日"));
                break;
            case "2":
                NetBtnHistory lastSendRecord = netBtnHistoryService.getLastSendRecord(
                        new NetBtnHistory().setIp(netBtnHistory.getIp())
                                .setType(3).setDelFlag("0").setStage("1").setIsXiaFa(2)
                );
                String sendCurrentDate = "";
                String sendLastDate = "";
                if (ObjectUtils.isNotEmpty(lastSendRecord) && ObjectUtils.isNotEmpty(lastSendRecord.getUpdateTime())) {
                    sendCurrentDate = DateFormatUtil.parseDateString(lastSendRecord.getUpdateTime(), "yyyy年MM月dd日");
                    sendLastDate = DateFormatUtil.parseDateString(DateFormatUtil.addDays(lastSendRecord.getUpdateTime(), interval), "yyyy年MM月dd日");
                }
                map.put("{{deptName}}", netBtnHistory.getDeptName());
                map.put("{{sendCurrentDate}}", sendCurrentDate);
                map.put("{{sendLastDate}}", sendLastDate);
                map.put("{{ip}}", netBtnHistory.getIp());
                map.put("{{lastDate}}", DateUtils.addDay(interval));
                map.put("{{currentDate}}", new DateTime().toString("yyyy年MM月dd日"));
                break;
            case "3":
                map.put("{{deptName}}", netBtnHistory.getDeptName());
                //map.put("{{lastDate}}", DateUtils.addDay(interval));
                map.put("{{currentDate}}", new DateTime().toString("yyyy年MM月dd日"));
                break;
            default:
                // 处理无效的阶段
                break;
        }
        return map;
    }
}

```

### 策略接口实现03

```java
package com.ruoyi.system.strategy;

import cn.hutool.core.date.DateTime;
import com.ruoyi.system.domain.NetBtnHistory;
import com.ruoyi.system.domain.NetModelDisplay;
import com.ruoyi.system.service.INetBtnHistoryService;
import com.ruoyi.system.service.INetModelDisplayService;
import com.ruoyi.system.util.DateFormatUtil;
import com.ruoyi.system.util.DateUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * 病毒扫描策略实现类
 */
@Component
@RequiredArgsConstructor
public class VirusScanStrategy implements CheckStrategy {
    private final INetModelDisplayService netModelDisplayService;
    private final INetBtnHistoryService netBtnHistoryService;
    @Override
    public Map<String, String> assembleMap(String stage, NetBtnHistory netBtnHistory) {
        HashMap<String, String> map = new HashMap<>();
        //默认间隔3天
        Integer interval = 3;
        NetModelDisplay netModelDisplay = netModelDisplayService.getByTypeAndStage(3, stage);
        if (netModelDisplay != null) {
            interval = netModelDisplay.getInterval();
        }
        switch (stage) {
            case "1":
                map.put("{{deptName}}", netBtnHistory.getDeptName());
                map.put("{{ip}}", netBtnHistory.getIp());
                map.put("{{lastDate}}", DateUtils.addDay(interval));
                map.put("{{currentDate}}", new DateTime().toString("yyyy年MM月dd日"));
                break;
            case "2":
                NetBtnHistory lastSendRecord = netBtnHistoryService.getLastSendRecord(
                        new NetBtnHistory().setIp(netBtnHistory.getIp())
                                .setType(2).setDelFlag("0").setStage("1").setIsXiaFa(2)
                );
                String sendCurrentDate = "";
                String sendLastDate = "";
                if (ObjectUtils.isNotEmpty(lastSendRecord) && ObjectUtils.isNotEmpty(lastSendRecord.getUpdateTime())) {
                    sendCurrentDate = DateFormatUtil.parseDateString(lastSendRecord.getUpdateTime(), "yyyy年MM月dd日");
                    sendLastDate = DateFormatUtil.parseDateString(DateFormatUtil.addDays(lastSendRecord.getUpdateTime(), interval), "yyyy年MM月dd日");
                }
                map.put("{{deptName}}", netBtnHistory.getDeptName());
                map.put("{{sendCurrentDate}}", sendCurrentDate);
                map.put("{{sendLastDate}}", sendLastDate);
                map.put("{{ip}}", netBtnHistory.getIp());
                map.put("{{lastDate}}", DateUtils.addDay(interval));
                map.put("{{currentDate}}", new DateTime().toString("yyyy年MM月dd日"));
                break;
            case "3":
                map.put("{{deptName}}", netBtnHistory.getDeptName());
                //map.put("{{lastDate}}", DateUtils.addDay(interval));
                map.put("{{currentDate}}", new DateTime().toString("yyyy年MM月dd日"));
                break;
            default:
                // 处理无效的阶段
                break;
        }
        return map;
    }
}

```

